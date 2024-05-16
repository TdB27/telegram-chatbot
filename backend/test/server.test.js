const { it, expect, describe, jest, beforeAll, afterAll } = require("@jest/globals");
const { localServerAdress, port: localPort } = require("../config/serverConfig.js");

async function loadServer() {
    const server = new Promise((resolve, reject) => {
        try {
            const httpServer = require("../index.js");
            resolve(httpServer)
        } catch (error) {
            reject(error);
        }
    })

    return server;
}

async function waitForServer(server) {
    return new Promise((resolve, reject) => {
        server.once("error", (err) => reject(err));
        server.once("listening", () => resolve());
    });
}

describe("Server Test Suit", () => {
        it("it should verify if server is on", async () => {
            // Arrange
            const address = `${localServerAdress}:${localPort}`

            // Act
            const data = await fetch(`${address}/on`).then(resp => resp.json());

            // Assert
            expect(data).toEqual("O servidor está on")
        })

    describe("server test", () => {
        it("it should port server is 4000", async () => {
            // Arrange
            process.env.NODE_ENV = 'test';
            process.env.PORT = 4000;
            jest.spyOn(console, console.log.name);

            // Act
            let server = await loadServer()
            await waitForServer(server)

            const { address, port } = server.address();

            // Assert
            expect(port).toBe(4000);
            expect(console.log).toHaveBeenCalledWith(`Backend rodando na porta ${address}:${port}`)

            return new Promise((resolve) => server.close(resolve));
        })
    })
})
