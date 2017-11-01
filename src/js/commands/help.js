import std from '../io/std'
import commands from '.';

export default {
    name: 'help',
    description: "Shows help",
    exec: function (args) {
        std.push("Help!")
        commands.map(x => std.push("Command: " + x.name + " - " + x.description))
    }
}