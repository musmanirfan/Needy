export const checkDateDifference = (firestoreTimestamp: { toDate: () => any; }) => {
    const today = new Date(); // Current date
    const savedDate = firestoreTimestamp.toDate(); // Convert Firestore Timestamp to JS Date

    // Remove time portion for accurate day comparison
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const savedDateStart = new Date(savedDate.setHours(0, 0, 0, 0));

    // Calculate the difference in days
    const diffInTime = savedDateStart.getTime() - todayStart.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays === -1) return "Yesterday";
    if (diffInDays < -1) return `${Math.abs(diffInDays)} days ago`;
    if (diffInDays > 1) return `In ${diffInDays} days`;

    return "Unknown date"; // Fallback case
};