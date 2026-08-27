import {Component} from "react";
import SopranoService from "../../services/SopranoService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./EpisodesList.css"

class EpisodesList extends Component {
    constructor(props) {
        super(props);
        this.myRef = {};
    }

    state = {
        episodes: [],
        loading: true,
        error: false,
        offset: 0,
        newItemLoading: false,
        itemsEnding: false,
    }

    sopranoService = new SopranoService;

    componentDidMount() {
        this.uploadEpisodes();
    }

    uploadEpisodes = () => {
        const {offset} = this.state;
        this.loadingEpisodes();
        this.sopranoService
            .getAllEpisodes(offset)
            .then(this.loadedEpisodes)
            .catch(this.errorEpisodes)
    }

    loadedEpisodes = (newEpisodes) => {
        const {episodes, offset} = this.state;
        let ended = false;
        if (newEpisodes.length < 8) {
            ended = true;
        }
        this.setState({
            episodes: [...episodes, ...newEpisodes],
            loading: false,
            offset: offset + 8,
            newItemLoading: false,
            itemsEnding: ended,
        })
    }


    loadingEpisodes = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    errorEpisodes = () => {
        this.setState({
            error: true
        })
    }


    setEpisodeItemRef = (elem, id) => {
        this.myRef[id] = elem;
    }

    episodeItemSelected = (id) => {
        Object.values(this.myRef).forEach(item => {
            item.classList.remove('episodes-list__item_active')
        })
        if (this.myRef[id]) {
            this.myRef[id].classList.add('episodes-list__item_active');
            this.myRef[id].focus();
        }

    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <li className='episodes-list__item'
                    ref={(elem) => this.setEpisodeItemRef(elem, item.id) }
                    onClick={() => {
                        this.episodeItemSelected(item.id);
                        this.props.onEpisodeSelected(item.id);
                    }}
                >
                    <img className='episodes-list__item-img' src={item.image} alt={item.name}/>
                    <p className='episodes-list__item-name'>{item.name}</p>
                </li>
            )
        })
        return items;
    }

    render() {
        const {episodes, loading, error, newItemLoading, itemsEnding} = this.state;
        const items = this.renderItems(episodes);
        const content = episodes ? items : null;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        return (
            <div className='episodes-list-block'>
                <ul className='episodes-list'>
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className='episodes-list__button'
                        disabled={newItemLoading}
                        style={{"display": itemsEnding ? "none" : "block"}}
                        onClick={this.uploadEpisodes}
                >
                    load more
                </button>
            </div>
        )
    }
}



export default EpisodesList;
