import { commands } from "./commands";
import { content } from "./main";

export const color: {
    [key: string]: (text: string) => string;
} = {
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
};

export function handleCommand(command: string) {
    if (command.trim() == "") return;
    const args = command.split(" ");
    if (args.length === 0) return;
    const cmd = args.shift()!;

    (term.history = JSON.parse(localStorage.getItem("history") || "[]")),
        term.history.push(command);
    term.historyIndex = term.history.length;
    localStorage.setItem("history", JSON.stringify(term.history));

    if (commands[cmd]) {
        if (typeof commands[cmd].response === "function") {
            const response = commands[cmd].response(args);
            if (response instanceof Promise) {
                response.then((res) => addText(res));
            } else {
                if (response) addText(response);
            }
        } else addText(commands[cmd].response as unknown as string[]);
    } else {
        addText([color.lightred(`Command not found: ${cmd}`)]);
    }
}

export const term: {
    line: string;
    offset: number;
    log: string[];
    history: string[];
    historyIndex: number;
    color: (text: string) => string;
    prefix: string;
} = {
    line: "",
    offset: 0,
    log: [],
    history: [],
    historyIndex: 0,
    color: color.lightgreen,
    prefix: "",
};

term.prefix = `${term.color("guest@lebogo.me")}:${color.lightblue("~")}$ `;

export function render() {
    var line = term.prefix + "<span id='cursor'>_</span>";
    if (term.line)
        line =
            term.prefix +
            term.line.substring(0, term.offset) +
            "<span id='cursor'>_</span>" +
            term.line.substring(term.offset);
    content.innerHTML = [...term.log, line].join("\n");
    window.scrollTo(0, document.body.scrollHeight);
}

export async function addText(lines: string | string[] | undefined) {
    if (!lines) return;
    if (typeof lines === "string") lines = [lines];
    for (let line of lines) {
        term.log.push(line);
        await new Promise((r) => setTimeout(r, 20));

        render();
    }
}
term.history = JSON.parse(localStorage.getItem("history") || "[]");
term.historyIndex = term.history.length;
