namespace Core;

public class Class1
{

}


////4. Reference Core in your APIs

//For example, to use Core in AuthAPI:

//dotnet add AuthAPI/AuthAPI.csproj reference Core/Core.csproj


//Do the same for Publisher and Subscriber:

//dotnet add PublisherAPI/PublisherAPI.csproj reference Core/Core.csproj
//dotnet add SubscriberAPI/SubscriberAPI.csproj reference Core/Core.csproj

//5. Verify references

//Check inside any.csproj(example AuthAPI.csproj), you’ll see:

//<ItemGroup>
//  <ProjectReference Include = "..\Core\Core.csproj" />
//</ ItemGroup >