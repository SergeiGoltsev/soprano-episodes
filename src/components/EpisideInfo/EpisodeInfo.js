import {Component} from "react";
import SopranoService from "../../services/SopranoService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./EpisodeInfo.css"

class EpisodeInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        episode: null,
        loading: false,
        error: false,
    }

    sopranoService = new SopranoService();

    componentDidMount() {
       this.updateEpisode();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.episodeId !== prevProps.episodeId) {
            this.updateEpisode();
        }
    }

    updateEpisode = () => {
        const {episodeId}  = this.props;
        if (!episodeId) {
            return
        }
        this.onEpisodeLoading();
        this.sopranoService
            .getEpisodes(episodeId)
            .then(this.loadedEpisode)
            .catch(this.errorEpisode)
    }


    loadedEpisode = (episode) => {
        this.setState({
            episode,
            loading: false
        })
    }

    onEpisodeLoading = () => {
        this.setState({
            loading: true
        })
    }

    errorEpisode = () => {
        this.setState({
            error: true
        })
    }


    render() {
        const {episode, loading, error} = this.state;
        const content = (!loading && !error && episode) ? <View episode={episode}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const skeleton = (loading || error || episode) ? null :
            <div className='episodes-info__text'>Select an episode</div>
        return (
            <div className='episodes-info'>
                {spinner}
                {errorMessage}
                {content}
                {skeleton}
            </div>
        )
    }
}

const View = ({episode}) => {
    const {image, name, season, number, date, summary} = episode;
    return (
        <>
            <img className='episodes-info__img' src={image} alt={name}/>
            <p className='episodes-info__name'>{name}</p>
            <p className='episodes-info__text'>season {season} - episode {number}</p>
            <p className='episodes-info__text'>{date}</p>
            <p className='episodes-info__text'>{summary}</p>
        </>
    )
}

export default EpisodeInfo;