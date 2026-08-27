import {Component} from "react";
import SopranoService from "../../services/SopranoService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./randomEpisode.css"

class RandomEpisode extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        episode: {},
        loading: true,
        error: false,
    }

    sopranoService = new SopranoService();

    componentDidMount() {
        this.uploadEpisode()
    }

    uploadEpisode = () => {
        const min = 47840;
        const max = 47925;
        const id = Math.floor(Math.random() * (max - min + 1) + min);
        this.sopranoService
            .getEpisodes(id)
            .then(this.loadedEpisode)
            .catch(this.errorEpisode)

    }

    loadedEpisode = (episode) => {
        this.setState({
            episode,
            loading: false
        })
    }

    errorEpisode = () => {
        this.setState({
            error: true
        })
    }

    render() {
        const {episode, loading, error}  =this.state;
        const content = episode ? <View episode={episode} /> : null;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        return (
            <div className='random-episode-block'>
                <div className="random-episode">
                    {spinner}
                    {errorMessage}
                    {content}
                </div>
                <button className="random-episode__button" onClick={this.uploadEpisode}>
                    Try again
                </button>
            </div>
        )
    }
}

const View = ({episode}) => {
    const {image, name, season, number, date, time, homepage, summary } = episode;
    return (
        <div className='random-episode-content'>
            <div className='random-episode__top'>
                <img className='random-episode__img' src={image} alt={name}/>
                <div className='random-episode__text-block'>
                    <p className='random-episode__name'>{name}</p>
                    <p className='random-episode__text'>Season: {season}</p>
                    <p className='random-episode__text'>Episode № {number}</p>
                    <p className='random-episode__text'>Release: {date}</p>
                    <p className='random-episode__text'>Duration: {time} m</p>
                    <a className='random-episode__link' href={homepage}>Home Page</a>
                </div>
            </div>
            <p className='random-episode__summary'>{summary}</p>
        </div>
    )
}

export default RandomEpisode;