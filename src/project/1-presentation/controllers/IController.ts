export default interface IController {
    handle: (request: any) => Promise<any>
}