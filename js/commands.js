const commands = {
    help: {
        description: "Show this help",
        response: () => {
            var availableCommands = Object.keys(commands).sort();
            var maxLength = 0;
            for (let command of availableCommands)
                maxLength = Math.max(command.length, maxLength);

            availableCommands = availableCommands.map((cmd) => {
                return `${color.lightyellow(cmd)} ${" ".repeat(
                    maxLength - cmd.length
                )}  ${commands[cmd].description}`;
            });

            return availableCommands;
        },
    },

    about: {
        description: "Show information about this terminol",
        response: async () => {
            const res = await fetch("README.md");
            const text = await res.text();
            return text;
        },
    },

    date: {
        description: "Show the current date",
        response: () => {
            const date = new Date();
            return `<span class='green'>${date.toString()}</span>`;
        },
    },

    clear: {
        description: "Clear the terminol",
        response: () => {
            term.log = [];
            render();
        },
    },

    colors: {
        description: "Show the available colors",
        response: () => {
            const colors = Object.keys(color).map((col) => color[col](col));
            return colors;
        },
    },

    reload: {
        description: "Reload the page",
        response: () => {
            location.reload();
        },
    },

    clearHistory: {
        description: "Clear the terminol history",
        response: () => {
            term.history = [];
            term.historyIndex = 0;
            localStorage.setItem("history", JSON.stringify(term.history));
        },
    },

    github: {
        description: "Open the github page",
        response: () => {
            window.open("https://github.com/LeBogoo/Terminol");
            return "Opening github page... (<a href='https://github.com/LeBogoo/Terminol'>GitHub</a>)";
        },
    },

    exit: {
        description: "Exit the terminol",
        response: () => {
            window.close();
        },
    },
};
