import del from 'del';

// Clean build folder =====================================================
export const cleanBuild = () => {
    return del('./build/**/*');
};

export const cleanProxy = () => {
    return del('./src/images/proxy/**/*');
};