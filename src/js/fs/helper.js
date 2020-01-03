import session from "../session";

/**
 * Returns String
 * @param {string[]} parts 
 * @returns {string}
 */
export function join(parts) {
    return parts.join('/').replace('//', '/')
}

/**
 * Returns Parts
 * @param {string} path 
 * @returns {string[]}
 */
export function expand(path) {
    return ['/', ...path.split('/').filter(x => x !== '')];
}

/**
 * Returns Parts
 * @param {string} path 
 * @returns {string}
 */
export function toAbsolute(path) {
    if (path.indexOf('/') === 0) {
        return path
    }
    else if (path.indexOf('..') >= 0) {
        throw new Error('Relative path containing .. are not supported yet')
    }
    else {
        return `${join(session().currentLocation)}/${path.replace('./', '')}`
    }
}