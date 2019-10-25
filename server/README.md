Server spawns a process with the defined executable for every incoming connection.

## Hint
Think about how much ressources you have and if its enough to process all the expected connections/processes. Otherwise limit the amount of spawned processes through  `max_connections` defined in `settings.json`.

## Usage
* create settings.json in same directory (see exmaple below)
* run `npm start`

## settings.json
```js
{
	"executable": {
		"path": "myexecutable.exe",
		"args": []
	},
	"max_connections": 10,
	"port": 3000,
	"verbose": "true"
}
```
