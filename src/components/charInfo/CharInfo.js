import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return
        }
        clearError()
        getCharacter(charId)
        .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    //const {char, loading, error} = this.state

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null 

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    console.log(comics)
    
    const showComics = comics.slice(0, 10).map((item, i) => {
        const comicsId = item.resourceURI.slice(42)
            return (
                <li key={i} className="char__comics-item"><Link to={`/comics${comicsId}`} target="_blank">
                    {item.name}
                </Link></li>
            )
        })  

    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {   
                    comics.length > 0 ? showComics : 'There is no comics'
                }
 
            </ul>
        </>
    )
}


export default CharInfo;