export abstract class Aggregate {
    apply(event: any): void {
        console.log("log to store")
    }
}