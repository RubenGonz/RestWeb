import { envs } from "./config/envs"
import { AppRoutes } from "./presentarion/routes"
import { Server } from "./presentarion/server"

(() => {
  main()
})()

function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })

  server.start()
}