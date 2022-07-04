import { Link } from "react-router-dom"


const Page404 = () => {
    const linkStyle = {
        'color': '#9F0013'
    }
    const textStyle = {
        'marginTop': '12px'
    }
    const divStyle = {
        'textAlign': 'center',
        'marginTop': '80px'
    }
    return (
        <div style={divStyle}>
            <h1>Страница не найдена</h1>
            <h3 style={textStyle}>Вернитесь на <Link style={linkStyle} to='/'>предыдущую страницу</Link> или на <Link style={linkStyle} to='/'>главную страницу</Link></h3>
        </div>
    )
}

export default Page404