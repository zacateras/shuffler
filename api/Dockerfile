FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /api

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o /api

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /api
COPY --from=build-env /api .
ENTRYPOINT ["dotnet", "api.dll"]