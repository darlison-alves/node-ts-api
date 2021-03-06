import * as restify from 'restify';
export class Server {
    application: restify.Server;

    initRoutes(): Promise<any>{
        return new Promise((resolve, reject) => {
            try{                
                
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())

                this.application.get('/info', (req, res, next) => {
                    res.json({
                        browser: req.userAgent(),
                        method: req.method,
                        url: req.href(),
                        path: req.path(),
                        query: req.query
                    })
                
                    return next()
                })

                this.application.listen(3000, () => {
                    resolve(this.application)
                })

            }catch(error){
                reject(error)
            }
        })
    }
    bootstrap(): Promise<Server>{
        return this.initRoutes().then(() => this)
    }
}