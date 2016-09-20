# React MultiSelect

React MultiSelect is a reusable custom React dropdown component.

Install:

    npm i

To build all:

    npm run build

To build JS:

    npm run scripts

To build SCSS:

    npm run styles

###The component has the following props/options:

#### label (String) <Required>
This is the label for the inital dropdown value

#### initialSelectedIndexes (Array) <Required>
This is the default initial selected indexes. If you don't want any values to be selected then just provide an empty array - []

#### enabled (Bool) <Required>
If true, the dropdown will be clickable, if false, it will be disabled.

#### optionsData (Array) <Required>
The clickable values within the dropdown. - ['Andy', 'Meek']

#### selectedOptionsCallback (Function) <Optional>
The callback function, which is called after every option is clicked. The return value is the selected index.