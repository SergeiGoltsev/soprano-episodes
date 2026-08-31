import logo from '../components/app/sopranos-logo.webp'
class SopranoService {
    _baseAPI = 'https://api.tvmaze.com/shows/527/episodes';
    _baseOffset = 0;

    uploadResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return res.json();
    }

    getAllEpisodes = async (offset = this._baseOffset) => {
        const res = await this.uploadResource(this._baseAPI);
        return res.slice(offset, offset + 8).map(this.transformEpisode);
    }

    getEpisodes = async (id) => {
        const res = await this.uploadResource(`https://api.tvmaze.com/episodes/${id}`);
        return this.transformEpisode(res);
    }

    transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            summary: episode.summary ? episode.summary.replace(/<[^>]*>/g, "") : "Описание эпизода отсутствует",
            image: episode.image.original ? episode.image.original : logo,
            homepage: episode.url,
            season: episode.season,
            number: episode.number,
            date: episode.airdate,
            time: episode.runtime,
        }
    }
}

export default SopranoService