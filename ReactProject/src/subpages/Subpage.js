export default class Subpage {
    constructor(componentReference, path, navLabel) {
        this.component = componentReference;
        this.path      = path;
        this.label     = navLabel;
    }

    getLabel(props) {
        if(typeof this.label === "function") {
            return this.label(props);
        } else if (typeof this.label === "string") {
            return this.label;
        }
        return "";
    }

    isActive(props) {
        return (props.currentPath == this.path);
    }
}