import React, {useEffect, useState} from 'react' 
import { createUseStyles } from 'react-jss'
import ReactHtmlParser from 'react-html-parser'
const apiFetch=require('@wordpress/api-fetch').default

export default function WpFetch(props){
    const {position=0}=props
    const [article,setArticle]=useState(null)
    const classes=useStylesFromThemeFunction()
    useEffect(()=>{
        apiFetch( { path: 'https://enciv.org/wp-json/wp/v2/posts' }, {mode: 'no-cors'} ).then( ( posts ) => {
            if(posts.length && posts[position]){
                const rendered=posts[position].content.rendered
                const html=rendered.replace(/\[.*?\]/g,'')
                setArticle(<div className={classes.wpFetch}>{ReactHtmlParser(html)}</div>)
            }
        } );
    })
    return article
}

const useStylesFromThemeFunction = createUseStyles(theme => ({
    wpFetch: {
        '& img': {
            float: 'left',
            paddingRight: '1rem',
            paddingBottom: '1rem'
        }
    }
}))