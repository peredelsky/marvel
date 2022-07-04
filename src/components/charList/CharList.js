import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService'
import {useState, useEffect, useRef} from 'react';


const CharList = (props) => {
    
    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(1541)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        
        getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemsLoading(newItemsLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    // const loadChars = () => {
    //         marvelService
    //         .getAllCharacters()
    //         .then(onCharListLoaded)
    //         .catch(onError);
    // }


    const elem = charList.map(item => {
        return (
            <li className="char__item"
            key={item.id}
            onClick={() => props.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt="thumbnail"/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemsLoading ? <Spinner /> : null
    // const content = !(loading || error) ? elem : null
    
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {elem}
                {/* {content} */}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}   
                    onClick={() => onRequest(offset)}     
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )


}

export default CharList;