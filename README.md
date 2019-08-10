# NestCriteria  

[![Build Status](https://travis-ci.org/implicity-healthcare/nest-criteria.svg?branch=master)](https://travis-ci.org/implicity-healthcare/nest-criteria)

NestCriteria is a Toolbox helping to maintain lazy relation between controllers/service/repository layers.

## Installation

```
yarn add @implicity/nest-criteria
```

or

```
npm install --save @implicity/nest-criteria
```

## Usage

### Initialisation

Just use it, no dependency injection needed, no module registration. Ready to go!

### Quickstart demonstration

Let's start with the **controller**.
To get the value of the query parameter passed in the url, use the decorator `@Criteria()`

By default the decorator will look for the `criteria` query param, but you can override this behavior by passig the targeted key in argument.

```typescript
    @Get()
    public async paginate(@Criteria('other') criteria): Promise<IPaginatedResults<IEvent>> {
        return this.eventsService
          .paginate(criteria);
    }    
```

The returned type is a `IPaginatedResults<T>` allowing you to ensure your service is returning a paginated collection.


Then on the **service layer**, use the `IQueryCriteria<T>` to manipulate, if necessary, the criteria provided during the HTTP request interpretation.


```typescript
    public async paginate(criteria: IQueryCriteria<Event>): Promise<IPaginatedResults<IEvent>> {
        return await this.eventsRepository
            .paginate(criteria);
    }
```

Last but not least, the **repository layer**. Here we used TypeORM but the goal of this helper is to be ORM agnostic

```typescript
@EntityRepository(Event)
export default class EventsRepository extends Repository<Event> implements Datasource<Event>, IPaginateBehavior<Event> {
    paginate(criteria: IQueryCriteria<Event>): Promise<IPaginatedResults<Event>> {
        return PaginationHelper.paginate(this, criteria);
    }
}
``` 

The `PaginationHelper.paginate(datasource, critera)` will take on the first argument a `DataSource<T>` ensuring the component is able to process criteria,
the second argument is actually the `IQueryCriteria<T>` to use.


And finally the results

```json
{
    "results": [
        {
            "id": 1,
            "created_date": "2019-07-15T06:34:04.568Z",
            "updated_date": "2019-07-15T06:34:04.568Z",
            "name": "events.document.report.approved"
        },
        {
            "id": 2,
            "created_date": "2019-07-15T06:34:32.548Z",
            "updated_date": "2019-07-15T06:34:32.548Z",
            "name": "events.billing.invoice.generated"
        }
    ],
    "total": 2,
    "index": 0,
    "limit": 10,
    "previous": false,
    "next": false
}
```
