import {Component} from "react";
import RandomEpisode from "../randomEpisode/RandomEpisode";
import EpisodesList from "../episodesList/EpisodesList";
import EpisodeInfo from "../EpisideInfo/EpisodeInfo"
import logo from './sopranos-logo.webp'

import './app.css'

class App extends Component {
    state = {
        selectedEpisode: null
    }

    onEpisodeSelected = (id) => {
        this.setState({
            selectedEpisode: id,
        })
    }

    render() {
        return (
            <div className="app">
                <div className='page'>
                    <div className='page__title-block'>
                        <h1 className='page__title'>Soprano episodes</h1>
                        <img className='page__title-img' alt='Soprano logo' src={logo}/>
                    </div>
                    <RandomEpisode/>
                    <div className='episodes-list__content'>
                        <EpisodesList onEpisodeSelected={this.onEpisodeSelected}/>
                        <EpisodeInfo episodeId={this.state.selectedEpisode}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;