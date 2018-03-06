import std from '../io/std';
import fs from '../fs'

export default {
    name: 'ls',
    description: "Lists directory contents of files and directories", 
    exec: function (args) { 
        let files = ['/bin', '/mnt', , '/root','/temp']
        std.push(files.join(' ')); 
    },
    
};