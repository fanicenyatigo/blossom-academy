Week 13: Alcohol COnsumption in Africa
================
Fanice M Nyatigo
03/07/2018

Loading Packages...
-------------------

``` r
library(tidyverse)
```

    ## -- Attaching packages --------------------------------------------- tidyverse 1.2.1 --

    ## v ggplot2 2.2.1     v purrr   0.2.5
    ## v tibble  1.4.2     v dplyr   0.7.5
    ## v tidyr   0.8.1     v stringr 1.3.1
    ## v readr   1.1.1     v forcats 0.3.0

    ## -- Conflicts ------------------------------------------------ tidyverse_conflicts() --
    ## x dplyr::filter() masks stats::filter()
    ## x dplyr::lag()    masks stats::lag()

``` r
library(ggthemes)
library(countrycode)
```

Reading Data
------------

``` r
alcohol <- read_csv("https://raw.githubusercontent.com/JoeSalami/MyTidyTuesday/master/Week%2013/Data/week13_alcohol_global.csv")
```

    ## Parsed with column specification:
    ## cols(
    ##   country = col_character(),
    ##   beer_servings = col_integer(),
    ##   spirit_servings = col_integer(),
    ##   wine_servings = col_integer(),
    ##   total_litres_of_pure_alcohol = col_double()
    ## )

``` r
alcohol$country <- as.factor(alcohol$country)
alcohol$continent <- factor( countrycode(sourcevar = alcohol$country,
                                     origin = 'country.name',
                                     destination = 'continent'))
```

    ## Warning in countrycode(sourcevar = alcohol$country, origin = "country.name", : Some values were not matched unambiguously: Micronesia

``` r
micronesia <- !is.na(alcohol$continent)
alcohol <- alcohol[micronesia,]
```

Subsetting Africa
-----------------

``` r
alcohol <- alcohol %>% mutate(total_servings = beer_servings + spirit_servings +   wine_servings) %>%
         select(country, continent, beer_servings, spirit_servings, 
                wine_servings, total_servings, total_litres_of_pure_alcohol) 

africa_alc <- alcohol %>% filter(continent == 'Africa') %>%
              arrange(desc(total_servings))
              
africa_alc_dist <- africa_alc %>% top_n(20, total_servings) %>% 
                gather(key = alcohol.type, value = servings, 
                        beer_servings, spirit_servings, wine_servings)
```

Distribution of Alcohol Consumption in Africa
---------------------------------------------

``` r
ggplot(africa_alc_dist, aes(x= reorder(country, servings),y=servings))+
  geom_bar(stat="identity", aes(fill = alcohol.type))+ 
  coord_flip() +
  scale_x_discrete(expand = c(.02, 0)) +
  labs(title = "Top 20 Alcohol Consumers In Africa",
  subtitle = "The highest consumers of alcohol (beer, wine, or spirits) in Africa",
       caption= "Data:FiveThirtyEight \nBy: @JoeSalami",
       x = "",
       y = "Servings of Alcohol",
       fill = "Alcohol Type") +
  theme(text = element_text(size = 11,colour= "black"),
               plot.title = element_text(face = "bold", size = 20),
               legend.title = element_text(face = 'bold')) +
  theme_light() 
```

![](alcohol_dat_files/figure-markdown_github/Africa_Alcohol_Distribution-1.png)

``` r
# ggsave("Africa_Alcohol_Distribution.jpg", path = path)
```

Top 10 Beer consuming African countries
---------------------------------------

``` r
africa_alc %>% top_n(10, beer_servings) %>%
ggplot(aes(x= reorder(country, beer_servings),y=beer_servings))+
  geom_bar(stat="identity", aes(fill = country))+
  coord_flip() +
  labs(title = "Top 10 Beer Consumers In Africa",
       caption= "Data:FiveThirtyEight \nBy: @JoeSalami",
       x = "",
       y = "Servings of Beer",
       fill = "Country") + 
  theme_light()+
  theme(text = element_text(size = 11,colour= "black"),
               plot.title = element_text(face = "bold", size = 20),
               legend.position = 'none')
```

![](alcohol_dat_files/figure-markdown_github/Africa_Beer_Consumers-1.png)

``` r
# ggsave("Africa_Beer_Consumers.jpg", path = '~/GitHub/MyTidyTuesday/Week 13/Images')
```

Top 10 Wine consuming African countries
---------------------------------------

``` r
africa_alc %>% top_n(10, wine_servings) %>%
ggplot(aes(x= reorder(country, wine_servings),y=wine_servings))+
  geom_bar(stat="identity", aes(fill = country))+
  coord_flip() +
  labs(title = "Top 10 Wine Consumers In Africa",
       caption= "Data:FiveThirtyEight \nBy: @JoeSalami",
       x = "",
       y = "Servings of Wine",
       fill = "Country") + 
  theme_light()+
  theme(text = element_text(size = 11,colour= "black"),
               plot.title = element_text(face = "bold", size = 20),
               legend.position = 'none')
```

![](alcohol_dat_files/figure-markdown_github/Africa_Wine_Consumers-1.png)

``` r
# ggsave("Africa_Wine_Consumers.jpg", path = '~/GitHub/MyTidyTuesday/Week 13/Images')
```

Top 15 Spirit consuming African countries
-----------------------------------------

``` r
africa_alc %>% top_n(10, spirit_servings) %>%
ggplot(aes(x= reorder(country, spirit_servings),y=spirit_servings))+
  geom_bar(stat="identity", aes(fill = country))+
  coord_flip() +
  labs(title = "Top 10 Spirits Consumers In Africa",
       caption= "Data:FiveThirtyEight \nBy: @JoeSalami",
       x = "",
       y = "Servings of Spirits",
       fill = "Country") +
  theme_light()+
  theme(text = element_text(size = 11,colour= "black"),
               plot.title = element_text(face = "bold", size = 20),
               legend.position = 'none')
```

![](alcohol_dat_files/figure-markdown_github/Africa_Spirits_Consumers-1.png)

``` r
# ggsave("Africa_Spirits_Consumers.jpg", path = '~/GitHub/MyTidyTuesday/Week 13/Images')
```
