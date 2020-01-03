import filesystem from './filesystem'
import session from '../session';

function exists(path) {
    return true;
}

function list(path) {
    debugger;
    const parts = ['/', ...path.split('/').filter(x => x !== '')];

    const traverse = (item, dept) => {
        const part = parts[dept];
        const content = item.find(x => x.name === part);

        if (!content) {
            const pathToError = parts.slice(0, dept + 1).join('/').slice(1);
            throw new Error(`File or directory not found. '${pathToError}'`);
        }
        if (dept + 1 === parts.length) {
            return content.files || [];
        }
        return traverse(content.files, ++dept);
    }

    return traverse(filesystem, 0);
}
export default {
    list
};