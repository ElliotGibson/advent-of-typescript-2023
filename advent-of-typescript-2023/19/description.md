> day 19

# Help Santa Embezzle Funds

The shady WiFi installment by Santa's college buddy in Days 12 and 16 aren't the only questionable business dealing Santa is involved in. Another of Santa's friends from college, Tod, is a partial owner of the X Games (an "extreme sports" version of the Olympics). In recent years, Santa realized that he can use his position of power at the toy factory to embezzle funds through a shell corporation that he started with Tod. The shell corporation, Icecap Assets Management, Inc., recently acquired a skateboard and scooter manufacturer, SkateScoot Syndicate. It's perfect timing because in 2022 Icecap had acquired another company that makes surfboards and bmx bikes, RideWave Dynamics.

Now, all that's left to do is make sure that every child gets a skateboard or a scooter! Then the funds will be laundered to Icecap via SkateScoot and RideWave, after which Santa and Tod can then take total control of the funds.

Santa made himself a list like this:

```typescript
type List = [2, 1, 3, 3, 1, 2, 2, 1];
```

And since Santa doesn't want to raise suspicion (by giving the same thing to every kid) he figures he'll alternate like this:

1. '🛹' (skateboard)
2. '🚲' (bmx bike)
3. '🛴' (scooter)
4. '🏄' (surfboard)
5. (loop back to skateboard)

```typescript
type Result = [
  '🛹', '🛹',
  '🚲',
  '🛴', '🛴', '🛴',
  '🏄', '🏄', '🏄',
  '🛹',
  '🚲', '🚲',
  '🛴', '🛴',
  '🏄',
]
```

> prompt by Dimitri Mitropoulos of MiTS