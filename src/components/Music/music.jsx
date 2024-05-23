import React, { Component } from "react";
import MusicPlayer from "./MusicPlayer";
import Test from "./test";

export default class Music extends Component {
    render() {
        return (
            <div>
                <MusicPlayer></MusicPlayer>
                <Test></Test>
            </div>
        )
    }
}