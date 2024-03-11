import { Helmet, HelmetProvider } from 'react-helmet-async'

const MetaHeader = ({ title }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{title} - อัศวินโต๊ะกลมในตำนาน</title>
            </Helmet>
        </HelmetProvider>
    )
}

export default MetaHeader