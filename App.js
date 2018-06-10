import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri:
      "https://instagram.fiev13-1.fna.fbcdn.net/vp/086b1cd1f5ec555eb5de8fed7e499d11/5BAD2552/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/26073173_1442601682515619_761744310013001728_n.jpg"
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },{
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  },
];

export default class App extends React.Component {
  renderCard(item, index) {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text style={{ marginBottom: 10 }}> Some description ... </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="all done!">
        <Text style={{ marginBottom: 10 }}>
          No more cards to swipe
        </Text>
        <Button
          title="load more"
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
        />
      </Card>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
