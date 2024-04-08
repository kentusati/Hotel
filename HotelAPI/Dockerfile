FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["HotelAPI/Hotel.API.csproj", "HotelAPI/"]
COPY ["Hotel.Core/Hotel.Core.csproj", "Hotel.Core/"]
COPY ["Hotel.Infastructure/Hotel.Infastructure.csproj", "Hotel.Infastructure/"]
COPY ["Hotel.DataAccess/Hotel.DataAccess.csproj", "Hotel.DataAccess/"]
RUN dotnet restore "HotelAPI/Hotel.API.csproj"
COPY . .
WORKDIR "/src/HotelAPI"
RUN dotnet build "Hotel.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hotel.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Hotel.API.dll"]