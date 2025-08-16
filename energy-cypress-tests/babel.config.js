module.exports = {
    presets: ["next/babel"],
    env: {
        development: {
            plugins: ["istanbul"]
        },
        test: {
            plugins: ["istanbul"]
        }
    }
};
