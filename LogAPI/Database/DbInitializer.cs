using LogAPI.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LogAPI.Database
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(UserManager<User> userManager)
        {
            if (!await userManager.Users.AnyAsync())
            {
                var user = new User
                {
                    UserName = "test",
                    Email = "test@test.com"
                };

                await userManager.CreateAsync(user, "11");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "22");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }
        }
    }
}