import std from '../io/std';
let m = "contact", m2 = "andreujuan", m3 = ['m', 'o', 'c', '.'].reverse().join('');
function getSign() { return "@"; }

export default {
    name: 'info',
    description: "Shows Juan's Info",
    exec: function (args) {
        std.clear();

        std.push('***********************************');
        std.push('  Juan Carlos Andreu Gutiérrez   ');
        std.push('  Software Architect  @Netherlands  ');
        std.push('  ' + m + getSign() + m2 + m3);
        std.push('  <br/> ');
        std.push('  Twitter: <a href="https://twitter.com/andreujuanc" target="blank" >@andreujuanc </a> ');
        std.push('  Github: <a href="https://github.com/andreujuanc"   target="blank" >/andreujuanc </a> ');
        std.push('***********************************');
    }
};