# Fix all remaining corrupted text in spells_db.js
$f = 'C:\Users\foxky\.gemini\antigravity\scratch\dnd-pwa\spells_db.js'
$c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# Line 575: Armadura del Mago (Mage Armor) - AC base 13 + Dex mod
# "43 piesás su modificador por Destreza" -> "13 + su modificador por Destreza"
$c = $c.Replace('43 piesás su modificador por Destreza', '13 + su modificador por Destreza')
Write-Output "Fixed: Armadura del Mago (13 + Dex)"

# Line 740: Curar Heridas (Cure Wounds) - 2d8 + spellcasting mod
# "2d26 piesás tu modificador" -> "2d8 más tu modificador"
$c = $c.Replace('2d26 piesás tu modificador por aptitud mágica', '2d8 más tu modificador por aptitud mágica')
Write-Output "Fixed: Curar Heridas (2d8)"

# Lines 1237 and 3127: Palabra de Curación / Palabra de Curación en Masa - 2d4 + mod  
# "2d13 piesás tu modificador" -> "2d4 más tu modificador"
$c = $c.Replace('2d13 piesás tu modificador por aptitud mágica', '2d4 más tu modificador por aptitud mágica')
Write-Output "Fixed: Palabra de Curación (2d4)"

# Line 1964: Hoja de Fuego (Flame Blade) - 3d6 + mod
# "3d20 piesás tu modificador" -> "3d6 más tu modificador" 
$c = $c.Replace('3d20 piesás tu modificador por aptitud mágica', '3d6 más tu modificador por aptitud mágica')
Write-Output "Fixed: Hoja de Fuego (3d6)"

# Line 2780: Disipar Magia (Dispel Magic) - DC 10 + spell level
# "CD 33 piesás el nivel" -> "CD de 10 + el nivel"
$c = $c.Replace('CD 33 piesás el nivel de ese conjuro', 'CD de 10 + el nivel de ese conjuro')
Write-Output "Fixed: Disipar Magia (CD 10 + nivel)"

# Line 4295: Curación en Masa (Mass Cure Wounds) - 5d8 + mod
# "5d26 piesás tu modificador" -> "5d8 más tu modificador"
$c = $c.Replace('5d26 piesás tu modificador por aptitud mágica', '5d8 más tu modificador por aptitud mágica')
Write-Output "Fixed: Curación en Masa (5d8)"

# Line 4531: Mano de Bigby (Bigby's Hand) - 4d6 + mod for grapple crush
# "4d20 piesás tu modificador" -> "4d6 más tu modificador"
$c = $c.Replace('4d20 piesás tu modificador por aptitud mágica', '4d6 más tu modificador por aptitud mágica')
Write-Output "Fixed: Mano de Bigby (4d6)"

# Save
[System.IO.File]::WriteAllText($f, $c, (New-Object System.Text.UTF8Encoding $false))
Write-Output ""
Write-Output "All fixes applied. Verifying..."

# Verify
$c2 = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
$remaining = ([regex]::Matches($c2, 'pies.s')).Count
Write-Output "Remaining 'piesás' occurrences: $remaining"
$hastaCount = ([regex]::Matches($c2, 'hasta Hasta')).Count
Write-Output "Remaining 'hasta Hasta' occurrences: $hastaCount"
