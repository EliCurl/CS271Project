
public class exampleNFA1 {

    public static boolean accepts(String input) {
        // used as a currentState // initially we are in q0
        boolean q0 = true;
        boolean q1 = false;
        boolean q2 = false;

        for (char c : input.toCharArray()) {
            boolean possibleQ0 = false;
            boolean possibleQ1 = false;
            boolean possibleQ2 = false;

            if (q0) { // self loop or a
                if (c == 'a' || c == 'b') {
                    possibleQ0 = true;
                }
                if (c == 'a') {
                    possibleQ1 = true;
                }
            }
            if (q1) { // a
                if (c == 'a') {
                    possibleQ2 = true;
                }
            }
            if (q2) { // self loop
                if (c == 'a' || c == 'b') {
                    possibleQ2 = true;
                }
            }

            // updates states
            q0 = possibleQ0;
            q1 = possibleQ1;
            q2 = possibleQ2;
        }

        return q2; // if true; then the string made it to the accepting state
    }

    public static void main(String[] args) {
        String[] tests = {"", "a", "b", "aa", "ab", "aba", "baa", "aab", "abba", "bbba", "bbab", "bbaa", "babaa", "bbbaaababbbaba"};
        for (String test : tests) {
            System.out.println("Input: \"" + test + "\" " + accepts(test));
        }
    }
}
