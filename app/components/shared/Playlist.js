import React from "react";
import { Text, View, ListView, StyleSheet } from "react-native";
import common from "../../styles/common";
import { SearchBar, List, ListItem } from "react-native-elements";
import SessionApi from "../../services/SessionApi";
import { SessionStore } from "../../stores/Session";

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Playlist",
    title: "HOSTING ROOM...",
    headerTintColor: "#919496",
    headerStyle: {
      backgroundColor: "#222326"
    }
  };

  constructor() {
    super();

    this.sessionStore = new SessionStore();
    this.sessionApi = new SessionApi();

    this.reloadPlaylist = this.reloadPlaylist.bind(this);
    this.reloadSearchlist = this.reloadSearchlist.bind(this);
    this.renderSearchListRow = this.renderSearchListRow.bind(this);
    this.onSearchChangeText = this.onSearchChangeText.bind(this);
    this.onSearchListItemPress = this.onSearchListItemPress.bind(this);
    this.renderPlaylistRow = this.renderPlaylistRow.bind(this);
    this.onPlaylistItemPress = this.onPlaylistItemPress.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      searchBarText: "",
      searchlistDataSource: dataSource.cloneWithRows([]),
      playlistDataSource: dataSource.cloneWithRows([])
    };
  }

  componentDidMount() {
    let reloadPlaylistIntervalId = setInterval(this.reloadPlaylist, 5000);
    this.setState({ reloadPlaylistIntervalId: reloadPlaylistIntervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.reloadPlaylistIntervalId);
    clearTimeout(this.state.searchBarTypingTimeoutId);
  }

  async reloadPlaylist() {
    let session = await this.sessionStore.get();
    let playlistResult = await this.sessionApi.playlist(session.id);
    let tracks = playlistResult.tracks;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      playlistDataSource: dataSource.cloneWithRows(tracks || [])
    });
  }

  async reloadSearchlist() {
    let searchBarText = this.state.searchBarText;
    let tracks = null;

    if (searchBarText) {
      let session = await this.sessionStore.get();
      let findResult = await this.sessionApi.find(session.id, searchBarText);

      tracks = findResult.tracks;
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      searchlistDataSource: dataSource.cloneWithRows(tracks || [])
    });
  }

  async onSearchChangeText(searchBarText) {
    this.setState({ searchBarText: searchBarText });
    clearTimeout(this.state.searchBarTypingTimeoutId);
    let searchBarTypingTimeoutId = setTimeout(this.reloadSearchlist, 500);
    this.setState({ searchBarTypingTimeoutId: searchBarTypingTimeoutId });
  }

  async onSearchListItemPress(rowData) {
    this.setState({ searchBarText: "" });
    let session = await this.sessionStore.get();
    let addResult = await this.sessionApi.add(session.id, rowData.trackUri);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({ searchlistDataSource: dataSource.cloneWithRows([]) });
  }

  async onPlaylistItemPress(rowData) {
    let session = await this.sessionStore.get();
    let voteResult = await this.sessionApi.vote(session.id, session.clientId, rowData.trackUri);
  }

  renderSearchListRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.artistName}
        style={style.listItem}
        containerStyle={style.listItemContainer}
        titleStyle={style.listItemTitleStyle}
        onPress={() => this.onSearchListItemPress(rowData)}
      />
    );
  }

  renderPlaylistRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.artistName}
        hideChevron={true}
        style={style.listItem}
        containerStyle={style.listItemContainer}
        titleStyle={style.listItemTitleStyle}
        badge={{
          value: rowData.votesCount,
          textStyle: style.listItemBadgeText,
          containerStyle: { marginTop: 5 }
        }}
        onPress={() => this.onPlaylistItemPress(rowData)}
      />
    );
  }

  render() {
    const isSearching = !!this.state.searchBarText;

    let list = null;
    if (isSearching) {
      list = (
        <List style={style.listContainer}>
          <ListView
            renderRow={this.renderSearchListRow}
            dataSource={this.state.searchlistDataSource}
            enableEmptySections={true}
          />
        </List>
      );
    } else {
      list = (
        <List style={style.listContainer}>
          <ListView
            renderRow={this.renderPlaylistRow}
            dataSource={this.state.playlistDataSource}
            enableEmptySections={true}
          />
        </List>
      );
    }

    return (
      <View style={common.background}>
        <SearchBar
          round
          ref={search => (this.search = search)}
          onChangeText={this.onSearchChangeText}
          placeholder="Add a track..."
        />

        {list}
      </View>
    );
  }
}

const style = StyleSheet.create({
  listItem: {
    backgroundColor: "#222326",
    borderColor: "#222326"
  },

  listItemContainer: {
    backgroundColor: "#000"
  },

  listItemTitleStyle: {
    color: "#eee"
  },

  listItemBadgeText: {
    color: "#2ab759"
  }
});
