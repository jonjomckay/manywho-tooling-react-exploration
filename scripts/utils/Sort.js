export default class Sort {
    static byDeveloperName(a, b) {
        return a.developerName.localeCompare(b.developerName);
    }

    static byLastModified(a, b) {
        return new Date(b.dateModified) - new Date(a.dateModified);
    }
}