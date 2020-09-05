import smartgrid from 'smart-grid';

/* It's principal settings in smart grid project */
const settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1366px', /* max-width оn very large screen */
        fields: '30px', /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1280px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px',
        },
        sm: {
            width: '768px',
            //fields: '15px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '480px',
        },
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    },
};

smartgrid('./src/static/styles/utils/', settings);