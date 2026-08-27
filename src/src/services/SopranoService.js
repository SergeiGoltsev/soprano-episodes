class SopranoService {
    _baseAPI = 'https://api.tvmaze.com/shows/527/episodes';
    _baseOffset = 0;

    uploadResource = async (url) => {
        const res = await fetch(url);
        return res.json();
    }

    getAllEpisodes = async (offset = this._baseOffset) => {
        const res = await this.uploadResource(this._baseAPI);
        return res.slice(offset, offset + 8).map(this.transformEpisode);
    }

    getEpisodes = async (id) => {
        const res = await this.uploadResource(this._baseAPI);
        const index = res.findIndex(item => item.id === id);
        return this.transformEpisode(res[index]);
    }

    transformEpisode = (episode) => {
        return {
            id: episode.id,
            name: episode.name,
            summary: episode.summary ? episode.summary.replace(/<p>|<\/p>/g, "") : "Описание эпизода отсутствует",
            image: episode.image.original,
            homepage: episode.url,
            season: episode.season,
            number: episode.number,
            date: episode.airdate,
            time: episode.runtime,
        }
    }


}

export default SopranoService