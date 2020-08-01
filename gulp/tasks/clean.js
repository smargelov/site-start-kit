import del from 'del';

// Clean build folder =====================================================
export const cleanBuild = () => {
    return del('./build/**/*');
};