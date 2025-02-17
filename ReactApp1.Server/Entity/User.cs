namespace ReactApp1.Server.Model
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<Bill> Bills { get; } = new();

        public User() { }
        public User(int id, string firstName, string lastName, List<Bill> bills)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Bills = bills;
        }
    }
}
