import {app} from "./app";
import {SETTINGS} from "./setting";


app.listen(SETTINGS.PORT, () => {
    console.log('...server started in port ' + SETTINGS.PORT)
})
