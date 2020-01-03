import std from '../io/std';
import session from '../session';
import fs from '../fs'
import { join } from '../fs/helper';

export default {
    name: 'cat',
    description: "ConCATenates file contents to the standard output",
    exec: function (args) {
        if (!args || args.length === 0) {
            std.push('Concatenation of stdin to stdout not yet implemented')
            return;
        }

        let file = ((args && args.length > 0) && args[0])
        if (!fs.exists(file)) {

        }
        const result = fs.read(file).split('\n');
        std.push(result);
    }
};