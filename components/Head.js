import Head from 'next/head';

export default function Header(props) {
    return (
        <Head>
            <title>
                {props.title || 'Добавь пропсы для title!'}
            </title>
            <meta charSet='UTF-8'/>
            <meta 
                name="description"
                content={props.description || 'Default description'}
            />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link 
                rel="icon"
                href={props.favicon || '/favicon.ico'}
            />
        </Head>
    )
}
