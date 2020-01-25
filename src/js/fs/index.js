import filesystem from './filesystem'
import session from '../session';
import { expand, toAbsolute } from './helper';


function find(path) {
    const absPath = toAbsolute(path)
    const parts = expand(absPath)
    let point = filesystem;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) {
            throw new Error('File does not exists')
        }
        point = traverse2(point, part)
        if (!point) {
            throw new Error('File does not exists')
        }
    }

    return point;
}

/**
 * Moves along the FS
 * @param {Array | { files:Array }} fsPoint 
 * @param {string} partName 
 */
function traverse2(fsPoint, partName) {
    return ((Array.isArray(fsPoint)) ? fsPoint : fsPoint.files)
        .find(x => x.name == partName)
}

function exists(path) {
    return true;
}

function list(path) {
    ;
    const parts = expand(path)

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

function read(path) {
    ;
    const file = find(path);
    if (file && file.content)
        return file.content;
    else
        throw new Error('Error while reading the file');
}

export default {
    list, read, exists
};