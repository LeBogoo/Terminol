const color = {
    blue: (text) => `<span style='color: #0037DA;'>${text}</span>`,
    green: (text) => `<span style='color: #13A10E;'>${text}</span>`,
    aqua: (text) => `<span style='color: #3A96DD;'>${text}</span>`,
    red: (text) => `<span style='color: #C51019;'>${text}</span>`,
    purple: (text) => `<span style='color: #881798;'>${text}</span>`,
    yellow: (text) => `<span style='color: #C19C00;'>${text}</span>`,
    gray: (text) => `<span style='color: #767676;'>${text}</span>`,
    lightblue: (text) => `<span style='color: #3B78FF;'>${text}</span>`,
    lightgreen: (text) => `<span style='color: #16C60C;'>${text}</span>`,
    lime: (text) => `<span style='color: #38F438;'>${text}</span>`,
    lightaqua: (text) => `<span style='color: #61D6D6;'>${text}</span>`,
    lightred: (text) => `<span style='color: #E74856;'>${text}</span>`,
    lightpurple: (text) => `<span style='color: #B40073;'>${text}</span>`,
    lightyellow: (text) => `<span style='color: #F9F18F;'>${text}</span>`,
    white: (text) => `<span style='color: #CCCCCC;'>${text}</span>`,

}

function handleCommand(command) {
    if (command.trim() == "") return;
    const args = command.split(" ");
    const cmd = args.shift();

    term.history = JSON.parse(localStorage.getItem("history")) || [];
    term.history.push(command);
    term.historyIndex = term.history.length;
    localStorage.setItem("history", JSON.stringify(term.history));

    if (commands[cmd]) {
        if (typeof commands[cmd].response === "function") {
            const response = commands[cmd].response();
            if (response instanceof Promise) {
                response.then(res => addText(res));
            } else {
                addText(response);

            }
        }
        else addText(commands[cmd].response);
    } else {
        addText([color.lightred(`Command not found: ${cmd}`)]);
    }
}

const term = {
    line: "",
    offset: 0,
    log: [],
    history: [],
    historyIndex: 0,
    color: color.lightgreen,
}

term.prefix = `${term.color("guest@lebogo.tk")}:${color.lightblue("~")}$ `;

function render() {
    var line = term.prefix + "<span id='cursor'>_</span>";
    if (term.line) line = term.prefix + term.line.substr(0, term.offset) + "<span id='cursor'>_</span>" + term.line.substr(term.offset);
    content.innerHTML = [...term.log, line].join("\n");
    window.scrollTo(0, document.body.scrollHeight);
}

function addText(lines) {
    if (!lines) return;
    if (typeof lines === "string") lines = [lines];
    for (let line of lines) term.log.push(line);
    render();
}
term.history = JSON.parse(localStorage.getItem("history")) || [];
term.historyIndex = term.history.length;