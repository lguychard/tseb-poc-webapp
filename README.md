# [ts-event-bus](https://github.com/Dashlane/ts-event-bus) POC Webapp

Demonstrates the use of [ts-event-bus](https://github.com/Dashlane/ts-event-bus) as a lightweight web framework, using [ts-event-bus-http-server-channel](https://github.com/lguychard/ts-event-bus-server-channel) and [ts-event-bus-http-client-channel](https://github.com/lguychard/ts-event-bus-client-channel)

The `/api` folder contains the API definition, shared by the client and server code, declared as a [ts-event-bus](https://github.com/Dashlane/ts-event-bus) `EventDeclaration`

This architecture provides:
- API changes are typechecked at compile time
- Lightweight, no-frills setup: no routing code server-side, no http requests code client-side
- Easily testable (examples TODO)
