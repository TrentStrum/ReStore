using Microsoft.AspNetCore.Identity;

public class User : IdentityUser<int>
{
    public UserAddress Address { get; set; }
}