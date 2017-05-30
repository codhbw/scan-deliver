import React from 'react';
import { ScrollView, StyleSheet, ListView, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Links',
    },
  };
  state = {
    dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.row}><Text>{rowData}</Text></View>}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  row: {
    alignItems: 'center'
  }
});
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
