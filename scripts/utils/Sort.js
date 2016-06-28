export default class Sort {
    static byDeveloperName(a, b) {
        return a.developerName.localeCompare(b.developerName);
    }

    static byFirstName(a, b) {
        return a.firstName.localeCompare(b.firstName);
    }

    static byLastModified(a, b) {
        return new Date(b.dateModified) - new Date(a.dateModified);
    }
}