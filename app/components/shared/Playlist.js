import React from "react";
import { Text, View, ListView, StyleSheet, ActivityIndicator } from "react-native";
import common from "../../styles/common";
import { SearchBar, List, ListItem } from "react-native-elements";
import SessionApi from "../../services/SessionApi";
import { SessionStore } from "../../stores/Session";
import Loader from '../../components/shared/Loader'

export default class extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Playlist"
  };

  sessionStore = new SessionStore();
  sessionApi = new SessionApi();

  constructor() {
    super();

    this.playlistReload = this.playlistReload.bind(this);
    this.searchReload = this.searchReload.bind(this);
    this.onSearchChangeText = this.onSearchChangeText.bind(this);
    this.onSearchItemPress = this.onSearchItemPress.bind(this);
    this.onPlaylistItemPress = this.onPlaylistItemPress.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      loading: true,

      searchBarText: '',
      searchDataSource: dataSource.cloneWithRows([]),
      searchTimeoutId: -1,

      playlistDataSource: dataSource.cloneWithRows([]),
      playlistIntervalId: -1
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this
      .playlistReload()
      .then(() => {
        let playlistIntervalId = setInterval(this.playlistReload, 5000);
        this.setState({
          loading: false,
          playlistIntervalId: playlistIntervalId
        });
      })
  }

  componentWillUnmount() {
    clearInterval(this.state.playlistIntervalId);
    clearTimeout(this.state.searchTimeoutId);
  }

  async playlistReload() {
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

  async onSearchChangeText(searchBarText) {
    this.setState({ searchBarText: searchBarText });
    clearTimeout(this.state.searchTimeoutId);
    let searchTimeoutId = setTimeout(this.searchReload, 500);
    this.setState({ searchTimeoutId: searchTimeoutId });
  }

  async searchReload() {
    this.setState({ loading: true });

    try {
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
        searchDataSource: dataSource.cloneWithRows(tracks || [])
      });
    }
    catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  }

  async onSearchItemPress(rowData) {
    this.setState({
      loading: true,
      searchBarText: ''
    });

    let tracks = null;

    try {
      let session = await this.sessionStore.get();
      let addResult = await this.sessionApi.add(session.id, rowData.trackUri);

      tracks = addResult.tracks;
    }
    catch (error) {
      console.log(error);
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      loading: false,
      searchDataSource: dataSource.cloneWithRows([]),
      playlistDataSource: dataSource.cloneWithRows(tracks || [])
    });
  }

  async onPlaylistItemPress(rowData) {
    this.setState({ loading: true });

    let tracks = null;

    try {
      let session = await this.sessionStore.get();
      let voteResult = await this.sessionApi.vote(session.id, session.clientId, rowData.trackUri);

      tracks = voteResult.tracks;
    }
    catch (error) {
      console.log(error);
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      loading: false,
      playlistDataSource: dataSource.cloneWithRows(tracks || [])
    });
  }

  renderSearchRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.artistName}
        style={style.listItem}
        containerStyle={style.listItemContainer}
        titleStyle={style.listItemTitleStyle}
        underlayColor='#333437'
        onPress={() => this.onSearchItemPress(rowData)}
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
        underlayColor='#333437'
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
        <List containerStyle={style.listContainer}>
          <ListView
            renderRow={this.renderSearchRow.bind(this)}
            dataSource={this.state.searchDataSource}
            enableEmptySections={true}
          />
        </List>
      );
    } else {
      list = (
        <List containerStyle={style.listContainer}>
          <ListView
            renderRow={this.renderPlaylistRow.bind(this)}
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
          value={this.state.searchBarText}
          onChangeText={this.onSearchChangeText.bind(this)}
          placeholder="Add a track..."
        />
        {
          this.state.loading
          ? <Loader />
          : list
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  listContainer: {
    borderColor: "#000000",
    marginTop: 0
  },

  listItem: {
    backgroundColor: "#222326"
  },

  listItemContainer: {
    backgroundColor: "#222326",
    borderBottomColor: "#000000",
    borderBottomWidth: 2
  },

  listItemTitleStyle: {
    color: "#eee"
  },

  listItemBadgeText: {
    color: "#2ab759"
  }
});
